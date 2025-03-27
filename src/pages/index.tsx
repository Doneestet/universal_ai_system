import Todo from '@/components/Todo'

export default function Home() {
	return (
		<main className='min-h-screen py-8'>
			<div className='max-w-4xl mx-auto px-4'>
				<h1 className='text-3xl font-bold text-center mb-8'>
					AI-Powered Todo List
				</h1>
				<Todo />
			</div>
		</main>
	)
}
