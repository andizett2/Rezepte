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
	const [type, setType] = useState('recipe')
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
				console.log(formData)
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
			}, 5000)
		} catch (error) {
			console.error('Failed to create recipe:', error);
			// Hier könntest du eine Fehlermeldung anzeigen
		}
	};

	const removeIngredient = (index) => {
		console.log(index)
		setIngredients(ingredients.filter((_, i) => i !== index));
	}

	return (
		<>
			<h1>Ihr neues Rezept</h1>
			<form encType="multipart/form-data" onSubmit={handleSubmit(submitHandler)} noValidate={true}>
				<div className="formrow">
					<label htmlFor="image" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
						Bild (optional)
					</label>
					<input
						type="file"
						id="image"
						accept="image/*"
						{...register('image')}
					/>
					{ image_url && <img src={image_url} alt="" className="upload-preview" />}
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
					type="submit"
					style={{
						backgroundColor: '#4CAF50',
						color: 'white',
						padding: '10px 15px',
						border: 'none',
						borderRadius: '4px',
						cursor: 'pointer',
					}}
				>
					Rezept speichern
				</button>
			</form>
		</>
	)
}

export default RecipeForm;