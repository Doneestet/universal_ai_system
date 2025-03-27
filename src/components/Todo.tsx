import { useState } from 'react'
import {
	PlusIcon,
	TrashIcon,
	ChevronDownIcon,
	ChevronUpIcon
} from '@heroicons/react/24/outline'
import { useTodos } from '@/hooks/useTodos'
import type { Todo as TodoType } from '@/types'

function TodoItem({
	todo,
	onToggle,
	onDelete
}: {
	todo: TodoType
	onToggle: (id: string) => void
	onDelete: (id: string) => void
}) {
	const [expanded, setExpanded] = useState(false)

	return (
		<div className='space-y-2'>
			<div className='flex items-center gap-2 p-2 bg-white rounded-lg shadow'>
				<input
					type='checkbox'
					checked={todo.completed}
					onChange={() => onToggle(todo.id)}
					className='h-4 w-4 text-blue-500'
				/>
				<span
					className={`flex-1 ${
						todo.completed ? 'line-through text-gray-400' : ''
					}`}
				>
					{todo.text}
				</span>
				{todo.subTasks.length > 0 && (
					<button
						onClick={() => setExpanded(!expanded)}
						className='p-1 text-gray-500 hover:bg-gray-50 rounded'
					>
						{expanded ? (
							<ChevronUpIcon className='h-5 w-5' />
						) : (
							<ChevronDownIcon className='h-5 w-5' />
						)}
					</button>
				)}
				<button
					onClick={() => onDelete(todo.id)}
					className='p-1 text-red-500 hover:bg-red-50 rounded'
				>
					<TrashIcon className='h-5 w-5' />
				</button>
			</div>

			{expanded && todo.subTasks.length > 0 && (
				<div className='ml-6 space-y-2'>
					{todo.analysis && (
						<div className='text-sm text-gray-600 bg-gray-50 p-2 rounded'>
							{todo.analysis.estimatedTime && (
								<p>Estimated time: {todo.analysis.estimatedTime}</p>
							)}
							{todo.analysis.complexity && (
								<p>Complexity: {todo.analysis.complexity}</p>
							)}
							{todo.analysis.notes && <p>Notes: {todo.analysis.notes}</p>}
						</div>
					)}
					{todo.subTasks.map(subtask => (
						<TodoItem
							key={subtask.id}
							todo={subtask}
							onToggle={onToggle}
							onDelete={onDelete}
						/>
					))}
				</div>
			)}
		</div>
	)
}

export default function Todo() {
	const [input, setInput] = useState('')
	const { todos, loading, error, addTodo, toggleTodo, deleteTodo } = useTodos()

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		if (!input.trim() || loading) return
		await addTodo(input)
		setInput('')
	}

	return (
		<div className='max-w-4xl mx-auto p-4'>
			<form onSubmit={handleSubmit} className='flex gap-2 mb-4'>
				<input
					type='text'
					value={input}
					onChange={e => setInput(e.target.value)}
					placeholder='Add a new task...'
					className='flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
					disabled={loading}
				/>
				<button
					type='submit'
					disabled={loading}
					className='p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50'
				>
					<PlusIcon className='h-5 w-5' />
				</button>
			</form>

			{error && (
				<div className='mb-4 p-2 text-red-600 bg-red-50 rounded'>{error}</div>
			)}

			{loading && (
				<div className='mb-4 p-2 text-blue-600 bg-blue-50 rounded'>
					Analyzing task...
				</div>
			)}

			<div className='space-y-4'>
				{todos.map(todo => (
					<TodoItem
						key={todo.id}
						todo={todo}
						onToggle={toggleTodo}
						onDelete={deleteTodo}
					/>
				))}
			</div>
		</div>
	)
}
