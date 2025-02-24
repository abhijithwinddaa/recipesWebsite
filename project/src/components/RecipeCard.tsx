import React, { useState } from 'react';
import { Clock, Users, Heart, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { Recipe, useRecipeStore } from '../store';
import RecipeDetailsModal from './RecipeDetailsModal';

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  const { toggleFavorite, removeRecipe } = useRecipeStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div 
        className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold">{recipe.title}</h3>
              <p className="text-sm text-gray-600 mt-1">{recipe.description}</p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(recipe.id);
                }}
                className="p-1 hover:bg-red-50 rounded-full"
              >
                <Heart
                  className={`h-5 w-5 ${
                    recipe.favorite ? 'text-red-500 fill-current' : 'text-gray-400'
                  }`}
                />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeRecipe(recipe.id);
                }}
                className="p-1 hover:bg-red-50 rounded-full"
              >
                <Trash2 className="h-5 w-5 text-gray-400 hover:text-red-500" />
              </button>
            </div>
          </div>
          <div className="mt-4 flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              <span>{recipe.prepTime + recipe.cookTime} min</span>
            </div>
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-1" />
              <span>{recipe.servings} servings</span>
            </div>
          </div>
          <div className="mt-2">
            <span className="inline-block px-2 py-1 text-xs font-medium bg-orange-100 text-orange-800 rounded">
              {recipe.category}
            </span>
          </div>
          <div className="mt-2 text-xs text-gray-500">
            Added {format(new Date(recipe.createdAt), 'MMM d, yyyy')}
          </div>
        </div>
      </div>

      <RecipeDetailsModal
        recipe={recipe}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default RecipeCard;