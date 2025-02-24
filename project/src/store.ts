import { create } from 'zustand';

export interface Ingredient {
  id: string;
  name: string;
  amount: number;
  unit: string;
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  ingredients: Ingredient[];
  instructions: string[];
  prepTime: number;
  cookTime: number;
  servings: number;
  category: string;
  image: string;
  favorite: boolean;
  createdAt: string;
}

interface RecipeStore {
  recipes: Recipe[];
  categories: string[];
  addRecipe: (recipe: Omit<Recipe, 'id' | 'createdAt'>) => void;
  removeRecipe: (id: string) => void;
  toggleFavorite: (id: string) => void;
  updateRecipe: (id: string, recipe: Partial<Recipe>) => void;
}

export const useRecipeStore = create<RecipeStore>((set) => ({
  categories: ['Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Snack'],
  recipes: [
    {
      id: '1',
      title: 'Classic Pancakes',
      description: 'Fluffy and delicious homemade pancakes perfect for breakfast',
      ingredients: [
        { id: '1', name: 'All-purpose flour', amount: 1.5, unit: 'cups' },
        { id: '2', name: 'Baking powder', amount: 3.5, unit: 'tsp' },
        { id: '3', name: 'Salt', amount: 0.25, unit: 'tsp' },
        { id: '4', name: 'Sugar', amount: 1, unit: 'tbsp' },
        { id: '5', name: 'Milk', amount: 1.25, unit: 'cups' },
        { id: '6', name: 'Egg', amount: 1, unit: 'large' },
        { id: '7', name: 'Melted butter', amount: 3, unit: 'tbsp' }
      ],
      instructions: [
        'In a large bowl, whisk together flour, baking powder, salt, and sugar',
        'In another bowl, whisk together milk, egg, and melted butter',
        'Pour wet ingredients into dry ingredients and whisk until just combined',
        'Heat a griddle or pan over medium heat',
        'Pour 1/4 cup batter for each pancake',
        'Cook until bubbles form on surface, then flip and cook other side'
      ],
      prepTime: 10,
      cookTime: 15,
      servings: 4,
      category: 'Breakfast',
      image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=800&q=80',
      favorite: true,
      createdAt: new Date().toISOString()
    }
  ],
  addRecipe: (recipe) =>
    set((state) => ({
      recipes: [
        {
          ...recipe,
          id: Math.random().toString(36).substr(2, 9),
          createdAt: new Date().toISOString(),
        },
        ...state.recipes,
      ],
    })),
  removeRecipe: (id) =>
    set((state) => ({
      recipes: state.recipes.filter((recipe) => recipe.id !== id),
    })),
  toggleFavorite: (id) =>
    set((state) => ({
      recipes: state.recipes.map((recipe) =>
        recipe.id === id
          ? { ...recipe, favorite: !recipe.favorite }
          : recipe
      ),
    })),
  updateRecipe: (id, updatedRecipe) =>
    set((state) => ({
      recipes: state.recipes.map((recipe) =>
        recipe.id === id
          ? { ...recipe, ...updatedRecipe }
          : recipe
      ),
    })),
}));