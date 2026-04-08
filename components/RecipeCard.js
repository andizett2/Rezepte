const RecipeCard = ( {recipe} ) => {
	return (
		<>
			<a href={'/rezepte/' + recipe._id} className="card">
				<div className="card__image-wrapper">
					<img src={recipe.image_url} alt={recipe.title} />
				</div>
				<div className="card__body">
					<h3 className="card__title">{recipe.title}</h3>
					<div className="card__meta">
						<span className="card__meta-item">⏱ time min</span>
					</div>
				</div>
			</a>
		</>
	)
}

export default RecipeCard;