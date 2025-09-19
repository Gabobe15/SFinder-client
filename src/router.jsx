import { createBrowserRouter } from 'react-router-dom';
import App from './App.jsx';

import { ETracker, ModalPage, Recipe, Todo } from './pages';
// import { Ingredient, Instructions, RecipePage } from './components';
import NotFoundPage from './components/NotFoundPage.jsx';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		errorElement: <NotFoundPage />,
		children: [
			// { index: true, element: <ETracker /> },

			// { index: true, element: <Recipe /> },
			// slug
			// { path: 'recipe/:slug', element: <RecipePage /> },
			// id
			// {
			// 	path: 'recipe/:id',
			// 	element: <RecipePage />,
			// 	children: [
			// 		{
			// 			path: 'instructions',
			// 			element: <Instructions />,
			// 		},
			// 		{
			// 			path: 'ingredient',
			// 			element: <Ingredient />,
			// 		},
			// 	],
			// },

			{ index: true, element: <ModalPage /> },
			{ path: 'todo', element: <Todo /> },
			// { path: '*', element: <NotFoundPage /> },
		],
	},
]);

// both error element and path * works the same

/*
export const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<App />}>
			<Route path="/" element={<Recipe />} />
			<Route path="/recipe/:id" element={<RecipePage />} />
			<Route path="/todo" element={<Todo />} />
			<Route path="/expense-tracker" element={<ETracker />} />
		</Route>
	)
);
*/

/*
export const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		children: [
	// ✅ Public routes (no authentication required)
		{path:'login' , element: <Login/>},
			{path:'signup' , element: <Signup/>},
			{path:'unauthorized' , element: <Unauthorized/>},
		
	// 🔒 Protected routes: accessible by authenticated users (admin or user)
		
			{
				element: <ProtectedRout allowedRoles={['admin', 'user']} />,
				children: [
					{ index: true, element: <Recipe /> },
					{ path: 'recipe/:id', element: <RecipePage /> },
				],
			},
	// 🔐 Admin-only protected routes
		
			{
				element: <ProtectedRoute allowedRoles={['admin']} />,
				children: [
					{ path: 'todo', element: <Todo /> },
					{ path: 'expense-tracker', element: <ETracker /> },
				],
			},
		
		],
	},
]);

*/