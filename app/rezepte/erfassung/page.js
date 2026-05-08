'use client';
import './page.css';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import { addRecipe } from "@/app/actions";
import { useStore } from "@/store";
import { getUnits } from "@/lib/lookups";
import { useRouter } from 'next/navigation';
import { uploadRecipeImage } from "@/app/actions";
import Image from 'next/image';


const RecipeForm = () => {
	const currentLocale = useStore((state) => state.locale);
	const currentUser = useStore((state) => state.currentUser?.email);
	const units = getUnits(currentLocale);
	const router = useRouter();

	// Schutz: Umleitung zu Login, wenn nicht angemeldet
	useEffect(() => {
		if (!currentUser) {
			router.push('/login');
		}
	}, [currentUser, router]);

	const { register, handleSubmit, formState, resetField, setValue } = useForm();
	const [id, setId] = useState(uuidv4());
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [steps, setSteps] = useState(['']);
	const [author, setAuthor] = useState(currentUser);
	const [created_at, setCreatedAt] = useState('');
	const [ingredients, setIngredients] = useState([{ amount: 1, unit: 0, name: '' }]);
	const [image_url, setImageUrl] = useState('');

	const handleIngredientChange = (index, value) => {
		const newIngredients = [...ingredients];
		newIngredients[index].name = value;
		setIngredients(newIngredients);

		// Füge ein neues leeres Feld hinzu, wenn das letzte Feld ausgefüllt wird
		if (index === ingredients.length - 1 && value.trim() !== '') {
			setIngredients([...newIngredients, { amount: 1, unit: units[0].id, name: '' }]);
		}
	};

	const handleAmountChange = (index, value) => {
		const newIngredients = [...ingredients];
		newIngredients[index].amount = parseInt(value, 0);
		setIngredients(newIngredients);
	};

	const handleUnitChange = (index, value) => {
		const newIngredients = [...ingredients];
		newIngredients[index].unit = parseInt(value, 0);
		setIngredients(newIngredients);
	};

	const handleStepChange = (index, value) => {
		const newSteps = [...steps];
		newSteps[index] = value;
		setSteps(newSteps);

		// Füge ein neues leeres Feld hinzu, wenn das letzte Feld ausgefüllt wird
		if (index === steps.length - 1 && value.trim() !== '') {
			setSteps([...newSteps, '']);
		}
	};

	const submitHandler = async (data) => {
		try {
			let imageUrl = '';

			// Upload image if provided
			if (data.image && data.image[0]) {
				const formData = new FormData();
				formData.append('image', data.image[0]);
				imageUrl = await uploadRecipeImage(data.image[0].name, data.image[0]);
				setImageUrl(imageUrl);
			}

			const newRecipe = {
				...data,
				image_url: imageUrl,
				author: author,
				steps: steps,
				ingredients: ingredients.filter(ingredient => ingredient.name.length),
				dtCreated: new Date().toISOString()
			};

			const result = await addRecipe(newRecipe);
			setTimeout(() => {
				router.push("/rezepte/" + result.insertedId);
			}, 1000)
		} catch (error) {
			console.error('Failed to create recipe:', error);
			// Hier könntest du eine Fehlermeldung anzeigen
		}
	};

	const removeIngredient = (index) => {
		setIngredients(ingredients.filter((_, i) => i !== index));
	}

	return (
		<>
			<div className="container mx-auto mb-10 max-w-4xl rounded-(--border-radius-md) bg-(--background-light) px-6 py-10 shadow-(--box-shadow-light)">
				<h1 className="mb-6 text-2xl font-bold">Dein neues Rezept</h1>
				<form encType="multipart/form-data" onSubmit={handleSubmit(submitHandler)} noValidate={true}>
					<div className="formrow mb-5">
						<label htmlFor="image" className="mb-1 block font-bold">
							Bild (optional)
						</label>
						<input
							className="file-input block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm transition file:mr-4 file:rounded-md file:border-0 file:bg-slate-100 file:px-3 file:py-2 file:text-sm file:font-semibold file:text-slate-700 hover:file:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
							type="file"
							id="image"
							accept="image/*"
							{...register('image')}
						/>
						{image_url && <Image src={image_url} alt="" className="upload-preview" width={150} height={150} />}
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

						{formState.errors.title && (
							<span className="error">{formState.errors.title.message}</span>
						)}
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
						<label className="mb-1 block font-bold">
							Zutaten:
						</label>
						{ingredients.map((ingredient, index) => (
							<div key={`ingredient-${index}`} className="mb-2.5">
								<input
									type="number"
									value={ingredient.amount}
									onChange={(e) => handleAmountChange(index, e.target.value)}
									className="w-[15%] rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-800 shadow-sm transition placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
								/>
								<select
									value={ingredient.unit}
									onChange={(e) => handleUnitChange(index, e.target.value)}
									className="w-[30%] rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-800 shadow-sm transition focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"

								>
									{
										units.map((unit, ix) => <option key={unit.id} value={unit.id}>{unit.value}</option>)
									}
								</select>
								<input
									type="text"
									value={ingredient.name}
									onChange={(e) => handleIngredientChange(index, e.target.value)}
									placeholder="Zutat eingeben..."
									className="w-[55%] rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-800 shadow-sm transition placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
								/>
							</div>
						))}
					</div>

					<div className="mb-5">
						<label className="mb-1 block font-bold">
							Zubereitungsschritte:
						</label>
						{steps.map((step, index) => (
							<div key={`step-${index}`} className="mb-2.5">
								<input
									type="text"
									value={step}
									onChange={(e) => handleStepChange(index, e.target.value)}
									placeholder="Schritt eingeben..."
									className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-800 shadow-sm transition placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
								/>
							</div>
						))}
					</div>

					<button
						className="btn cursor-pointer rounded bg-[#4CAF50] px-4 py-2.5 text-white"
						type="submit"
					>
						Rezept speichern
					</button>
				</form>
			</div>
		</>
	)
}

export default RecipeForm;