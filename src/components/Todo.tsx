import { useState } from 'react'
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline'

interface Todo {
	id: string
	text: string
	completed: boolean
	subTasks: Todo[]
}

export default function Todo() {
	const [todos, setTodos] = useState<Todo[]>([])
	const [input, setInput] = useState('')

	const addTodo = async () => {
		if (!input.trim()) return

		// Here we'll integrate AI to analyze and structure the task
		const newTodo: Todo = {
			id: Date.now().toString(),
			text: input,
			completed: false,
			subTasks: []
		}

		setTodos([...todos, newTodo])
		setInput('')
	}

	const toggleTodo = (id: string) => {
		setTodos(
			todos.map(todo =>
				todo.id === id ? { ...todo, completed: !todo.completed } : todo
			)
		)
	}

	const deleteTodo = (id: string) => {
		setTodos(todos.filter(todo => todo.id !== id))
	}

	return (
		<div className='max-w-4xl mx-auto p-4'>
			<div className='flex gap-2 mb-4'>
				<input
					type='text'
					value={input}
					onChange={e => setInput(e.target.value)}
					placeholder='Add a new task...'
					className='flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
				/>
				<button
					onClick={addTodo}
					className='p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500'
				>
					<PlusIcon className='h-5 w-5' />
				</button>
			</div>

			<ul className='space-y-2'>
				{todos.map(todo => (
					<li
						key={todo.id}
						className='flex items-center gap-2 p-2 bg-white rounded-lg shadow'
					>
						<input
							type='checkbox'
							checked={todo.completed}
							onChange={() => toggleTodo(todo.id)}
							className='h-4 w-4 text-blue-500'
						/>
						<span
							className={`flex-1 ${
								todo.completed ? 'line-through text-gray-400' : ''
							}`}
						>
							{todo.text}
						</span>
						<button
							onClick={() => deleteTodo(todo.id)}
							className='p-1 text-red-500 hover:bg-red-50 rounded'
						>
							<TrashIcon className='h-5 w-5' />
						</button>
					</li>
				))}
			</ul>
		</div>
	)
}
