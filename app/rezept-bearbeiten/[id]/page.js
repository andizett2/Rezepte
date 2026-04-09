'use client';
import '@/app/rezepte/erfassung/page.css';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import { addRecipe } from "@/app/actions";
import { useStore } from "@/store";
import { getUnits } from "@/lib/lookups";
import { useRouter, useParams } from 'next/navigation';
import { uploadRecipeImage } from "@/app/actions";
import { getRecipe, updateRecipe } from '@/app/actions';
import Image from 'next/image';
import Link from 'next/link';


const RecipeEdit = () => {

	const params = useParams();
	const router = useRouter();

	const currentLocale = useStore((state) => state.locale);
	const currentUser = useStore((state) => state.currentUser?.email);
	const units = getUnits(currentLocale);

	const { register, handleSubmit, formState, resetField, setValue, reset } = useForm();
	const [id, setId] = useState(params.id);
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [steps, setSteps] = useState(['']);
	const [author, setAuthor] = useState(currentUser);
	const [created_at, setCreatedAt] = useState('');
	const [ingredients, setIngredients] = useState([]);
	const [image_url, setImageUrl] = useState('');


	// Schutz: Umleitung zu Login, wenn nicht angemeldet
	useEffect(() => {
		if (!currentUser) {
			router.push('/login');
		} else {
			// Rezept laden und im Formular anzeigen
			getRecipe(id)
				.then(result => {
					setTitle(result.title);
					setDescription(result.description);
					setAuthor(result.author || currentUser.email);
					// Immer eine Leerzeile einfügen
					setIngredients([...result.ingredients, { amount: 1, unit: 0, name: '' }]);
					setSteps(result.steps);
					setImageUrl(result.image_url);
					// Formular mit allen Daten zurücksetzen
					reset({
						title: result.title,
						description: result.description,
						author: result.author || currentUser,
						// ingredients und steps sind hier nicht Teil des Formulars,
						// da sie in separaten States verwaltet werden
					});
				})
		}
	}, [currentUser, router, id, reset]);

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
			let imageUrl = image_url;

			// Bild ggf. hochladen und URL setzen
			if (data.image && data.image[0]) {
				const formData = new FormData();
				formData.append('image', data.image[0]);
				imageUrl = await uploadRecipeImage(data.image[0].name, data.image[0]);
				setImageUrl(imageUrl);
			}

			const updatedRecipe = {
				...data,
				_id: id,
				image_url: imageUrl,
				author: author,
				steps: steps,
				ingredients: ingredients.filter(ingredient => ingredient.name.length),
				dtCreated: new Date().toISOString()
			};

			// Daten aktualisieren und zur Detailansicht wechseln
			const result = await updateRecipe(updatedRecipe);
			setTimeout(() => {
				router.push("/rezepte/" + id);
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
			<h1>Dein neues Rezept</h1>
			<form encType="multipart/form-data" onSubmit={handleSubmit(submitHandler)} noValidate={true}>
				<div className="formrow">
					<label htmlFor="image" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
						{`Bild ${image_url ? 'ersetzen' : '(optional)'}`}
					</label>

					<input
						type="file"
						id="image"
						accept="image/*"
						{...register('image')}
					/>
					{image_url && <img src={image_url} alt="" className="upload-preview" />}
				</div>
				<div className="required formrow">
					<label htmlFor="title" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
						Bezeichnung
					</label>
					<input
						type="text"
						style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
						{...register('title', { required: 'Diese Angabe ist erforderlich ' })}
					/>

					{formState.errors.title && (
						<span className="error">{formState.errors.title.message}</span>
					)}
				</div>
				<div className="formrow">
					<label htmlFor="description" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
						Beschreibung
					</label>
					<textarea
						style={{ width: '100%', height: '15em', padding: '8px', boxSizing: 'border-box' }}
						{...register('description')}
					/>
				</div>

				<div style={{ marginBottom: '20px' }}>
					<label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
						Zutaten:
					</label>
					{ingredients.map((ingredient, index) => (
						<div key={`ingredient-${index}`} style={{ marginBottom: '10px' }}>
							<input
								type="number"
								value={ingredient.amount}
								onChange={(e) => handleAmountChange(index, e.target.value)}
								style={{ width: '15%', padding: '8px', boxSizing: 'border-box' }}
							/>
							<select
								value={ingredient.unit}
								onChange={(e) => handleUnitChange(index, e.target.value)}
								style={{ width: '30%', padding: '8px', boxSizing: 'border-box' }}

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
								style={{ width: '55%', padding: '8px', boxSizing: 'border-box' }}
							/>
						</div>
					))}
				</div>

				<div style={{ marginBottom: '20px' }}>
					<label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
						Zubereitungsschritte:
					</label>
					{steps.map((step, index) => (
						<div key={`step-${index}`} style={{ marginBottom: '10px' }}>
							<input
								type="text"
								value={step}
								onChange={(e) => handleStepChange(index, e.target.value)}
								placeholder="Schritt eingeben..."
								style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
							/>
						</div>
					))}
				</div>

				<button
					className="btn"
					type="submit"
					style={{
						backgroundColor: '#4CAF50',
						color: 'white',
						padding: '15px 15px',
						border: 'none',
						borderRadius: '4px',
						cursor: 'pointer',
					}}
				>
					Rezept aktualisieren
				</button>
				<Link className="btn btn--primary" href="/meine-rezepte" style={{float:"right"}}>Abbrechen</Link>
			</form>
		</>
	)
}

export default RecipeEdit;