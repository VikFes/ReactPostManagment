import React, { useEffect, useState} from 'react'
import PostService from './API/PostService';
import PostFilter from './components/PostFilter';
import PostForm from './components/PostForm';
import PostList from './components/PostList';
import MyButton from './components/UI/button/MyButton';
import Loader from './components/UI/loader/loader';
import MyModal from './components/UI/modal/MyModal';
import Pagination from './components/UI/pagination/Pagination';
import { useFetching } from './hooks/useFetching';
import { usePosts } from './hooks/usePost';

import './styles/App.css'
import { getPageCount } from './utils/pages';

function App() {

	const [posts, setPosts] = useState([])
	const [filter, setFilter] = useState({sort: '', search: ''})
	const [modal, setModal] = useState(false)
	const [totalPages, setTotalPages] = useState(0)
	const [limit, setLimit] = useState(10)
	const [page, setPage] = useState(1)
	
	const [fetchPosts, isPostsLoading, postError] = useFetching(async () => {
		const response = await PostService.getAll(limit, page)
		setPosts(response.data)
		const totalCount = response.headers['x-total-count']
		setTotalPages(getPageCount(totalCount, limit))
	})

	const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.search);

	useEffect(() => {
		fetchPosts()
	}, [page])

	const createPost = (newPost) => {
		setPosts([...posts, newPost])
		setModal(false)
	}

	const removePost = (post) => {
		setPosts(posts.filter(p => p.id !== post.id))
	}	

	const changePage = (page) => {
		setPage(page)
	}

  return (
    <div className="App">
		<MyButton 
			style={{marginTop: '30px'}} 
			onClick={() => setModal(true)}
		>
				Создать пост
		</MyButton>
		<MyModal 
			visible={modal} 
			setVisible={setModal}
		>
			<PostForm 
				create={createPost}
			/>
		</MyModal>
		<hr style={{margin: '15px 0'}}/>
		<PostFilter 
			filter={filter} 
			setFilter={setFilter}
		/>
		{postError &&
		<h2> Ошибка </h2>}
		{isPostsLoading
			? <div style={{display: 'flex', justifyContent: 'center', marginTop: '50px'}}><Loader/> </div> 
			: <PostList remove={removePost} posts={sortedAndSearchedPosts} title='Список постов'/>
		}
		<Pagination 
			page={page} 
			changePage={changePage} 
			totalPages={totalPages} 
		/>
    </div>
  );
}

export default App;
