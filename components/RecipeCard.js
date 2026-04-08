import Image from "next/image";

const RecipeCard = ( {recipe, user} ) => {

	return (
		<>
			<a href={'/rezepte/' + recipe._id} className="card">
				<div className="card__image-wrapper">
					<Image src={recipe.image_url} width="1200" height="1200" alt={recipe.title} />
				</div>
				<div className="card__body">
					<h3 className="card__title">{recipe.title}</h3>
					{/*<div className="card__meta">
						<span className="card__meta-item">von {user?.firstname}</span>
					</div>*/}
				</div>
			</a>
		</>
	)
}

export default RecipeCard;