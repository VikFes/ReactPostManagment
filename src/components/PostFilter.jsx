import React from 'react';
import MyInput from '../components/UI/input/MyInput';
import MySelect from '../components/UI/select/MySelect';

const PostFilter = ({filter, setFilter}) => {
	return (
		<div>
			<MyInput
				value={filter.search}
				onChange={e => setFilter({...filter, search: e.target.value})}
				placeholder='Поиск...'
			/>
			<MySelect
				value={filter.sort}
				onChange={sortedPosts => setFilter({...filter, sort: sortedPosts})}
				defaultValue={'Сортировка по:'}
				options={[
					{value: 'title', name: 'Названию'},
					{value: 'body', name: 'Описанию'}
				]}
			/>
		</div>
	);
};

export default PostFilter;