import Image from "next/image";
import Link from "next/link";
import './RecipeListItem.css';

const RecipeListItem = ({ recipe, user }) => {
	return (
		<>
		<Link href={`/rezepte/${recipe._id}`}>
			<div className="recipe-list-item">
				<div className="recipe-thumbnail">
					{
						recipe.image && (<Image alt="" width="100" height="100" src={recipe.image_url} />)
					}
				</div>
				<div className="recipe-link">
					{recipe.title}
				</div>
			</div>
		</Link>
		</>
	)
}

export default RecipeListItem;