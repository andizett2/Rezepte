'use client';

import '@/app/rezepte/erfassung/page.css';

import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState, type ChangeEvent } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { getRecipe, updateRecipe, uploadRecipeImage } from '@/app/actions';
import { getUnits } from '@/lib/lookups';
import { useStore } from '@/store';
import type { Recipe, RecipeIngredient } from '@/types/recipe';

interface RecipeEditFormValues {
	title: string;
	description: string;
	image: FileList;
}

const RecipeEdit = () => {
	const params = useParams<{ id: string }>();
	const router = useRouter();

	const currentLocale = useStore((state) => state.locale);
	const currentUser = useStore((state) => state.currentUser?.email);
	const units = getUnits(currentLocale);
	const recipeId = params.id;

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<RecipeEditFormValues>();

	const [steps, setSteps] = useState<string[]>(['']);
	const [ingredients, setIngredients] = useState<RecipeIngredient[]>([]);
	const [imageUrl, setImageUrl] = useState<string>('');
	const [author, setAuthor] = useState<string | undefined>(currentUser);

	// Schutz: Umleitung zu Login, wenn nicht angemeldet; sonst Rezept laden.
	useEffect(() => {
		if (!currentUser) {
			router.push('/login');
			return;
		}

		getRecipe(recipeId).then((result) => {
			if (!result) {
				return;
			}

			setAuthor(result.author || currentUser);
			setIngredients([...(result.ingredients ?? []), { amount: 1, unit: 0, name: '' }]);
			setSteps(result.steps?.length ? result.steps : ['']);
			setImageUrl(result.image_url ?? '');
			reset({
				title: result.title,
				description: result.description ?? '',
			});
		});
	}, [currentUser, recipeId, reset, router]);

	const handleIngredientChange = (index: number, value: string) => {
		const newIngredients = [...ingredients];
		newIngredients[index].name = value;
		setIngredients(newIngredients);

		if (index === ingredients.length - 1 && value.trim() !== '') {
			setIngredients([...newIngredients, { amount: 1, unit: units[0]?.id ?? 0, name: '' }]);
		}
	};

	const handleAmountChange = (index: number, value: string) => {
		const newIngredients = [...ingredients];
		newIngredients[index].amount = Number.parseInt(value, 10) || 0;
		setIngredients(newIngredients);
	};

	const handleUnitChange = (index: number, value: string) => {
		const newIngredients = [...ingredients];
		newIngredients[index].unit = Number.parseInt(value, 10);
		setIngredients(newIngredients);
	};

	const handleStepChange = (index: number, value: string) => {
		const newSteps = [...steps];
		newSteps[index] = value;
		setSteps(newSteps);

		if (index === steps.length - 1 && value.trim() !== '') {
			setSteps([...newSteps, '']);
		}
	};

	const submitHandler: SubmitHandler<RecipeEditFormValues> = async (data) => {
		try {
			let nextImageUrl = imageUrl;

			if (data.image?.[0]) {
				nextImageUrl = await uploadRecipeImage(data.image[0].name, data.image[0]);
				setImageUrl(nextImageUrl);
			}

			const updatedRecipe: Recipe = {
				_id: recipeId,
				title: data.title,
				description: data.description,
				image_url: nextImageUrl,
				author,
				steps,
				ingredients: ingredients.filter((ingredient) => ingredient.name.length > 0),
				dtCreated: new Date().toISOString(),
			};

			await updateRecipe(updatedRecipe);
			setTimeout(() => {
				router.push(`/rezepte/${recipeId}`);
			}, 1000);
		} catch (error) {
			console.error('Failed to update recipe:', error);
		}
	};

	return (
		<>
			<div className="container mx-auto mb-10 max-w-4xl rounded-(--border-radius-md) bg-(--background-light) px-6 py-10 shadow-(--box-shadow-light)">
				<h1 className="mb-6 text-2xl font-bold">Dein Rezept</h1>
				<form encType="multipart/form-data" onSubmit={handleSubmit(submitHandler)} noValidate>
					<div className="formrow mb-5">
						<label htmlFor="image" className="mb-1 block font-bold">
							{`Bild ${imageUrl ? 'ersetzen' : '(optional)'}`}
						</label>
						<input
							className="file-input block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm transition file:mr-4 file:rounded-md file:border-0 file:bg-slate-100 file:px-3 file:py-2 file:text-sm file:font-semibold file:text-slate-700 hover:file:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
							type="file"
							id="image"
							accept="image/*"
							{...register('image')}
						/>
						{imageUrl && <Image src={imageUrl} alt="" className="upload-preview" width={150} height={150} />}
					</div>
					<div className="required formrow mb-5">
						<label htmlFor="title" className="mb-1 block font-bold">
							Bezeichnung
						</label>
						<input
							type="text"
							className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-800 shadow-sm transition placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
							{...register('title', { required: 'Diese Angabe ist erforderlich ' })}
						/>

						{errors.title && <span className="error">{errors.title.message}</span>}
					</div>
					<div className="formrow mb-5">
						<label htmlFor="description" className="mb-1 block font-bold">
							Beschreibung
						</label>
						<textarea
							className="h-[15em] w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-800 shadow-sm transition placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
							{...register('description')}
						/>
					</div>

					<div className="mb-5">
						<label className="mb-1 block font-bold">Zutaten:</label>
						{ingredients.map((ingredient, index) => (
							<div key={`ingredient-${index}`} className="mb-2.5">
								<input
									type="number"
									value={ingredient.amount}
									onChange={(e: ChangeEvent<HTMLInputElement>) => handleAmountChange(index, e.target.value)}
									className="w-[15%] rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-800 shadow-sm transition placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
								/>
								<select
									value={ingredient.unit}
									onChange={(e: ChangeEvent<HTMLSelectElement>) => handleUnitChange(index, e.target.value)}
									className="w-[30%] rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-800 shadow-sm transition focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
								>
									{units.map((unit) => (
										<option key={unit.id} value={unit.id}>
											{unit.value}
										</option>
									))}
								</select>
								<input
									type="text"
									value={ingredient.name}
									onChange={(e: ChangeEvent<HTMLInputElement>) => handleIngredientChange(index, e.target.value)}
									placeholder="Zutat eingeben..."
									className="w-[55%] rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-800 shadow-sm transition placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
								/>
							</div>
						))}
					</div>

					<div className="mb-5">
						<label className="mb-1 block font-bold">Zubereitungsschritte:</label>
						{steps.map((step, index) => (
							<div key={`step-${index}`} className="mb-2.5">
								<input
									type="text"
									value={step}
									onChange={(e: ChangeEvent<HTMLInputElement>) => handleStepChange(index, e.target.value)}
									placeholder="Schritt eingeben..."
									className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-800 shadow-sm transition placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
								/>
							</div>
						))}
					</div>

					<button className="btn cursor-pointer rounded bg-[#4CAF50] px-3.75 py-3.75 text-white" type="submit">
						Rezept aktualisieren
					</button>
					<Link className="btn btn--primary float-right" href="/meine-rezepte">
						Abbrechen
					</Link>
				</form>
			</div>
		</>
	);
};

export default RecipeEdit;
