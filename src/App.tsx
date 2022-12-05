// import { v4 as uuidv4 } from 'uuid';

import { Header } from './components/Header'
import { Post } from './components/Post'
import { Sidebar } from './components/Sidebar'

import styles from './App.module.css'

export function App() {
  const posts = [
    {
      id: 1,
      author: {
        avatarUrl: 'https://github.com/ivgomes.png',
        name: 'Ivan Gomes',
        role: 'Desenvolvedor Web',
      },
      content: [
        { types: 'paragraph', content: 'Fala galera 👋' },
        {
          types: 'paragraph',
          content:
            'Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀',
        },
        { types: 'link', content: 'jane.design/doctorcare' },
      ],
      publishedAt: new Date('2022-11-30 20:00:00'),
    },
    {
      id: 2,
      author: {
        avatarUrl: 'https://github.com/ivgomes.png',
        name: 'Ivan Gomes',
        role: 'Desenvolvedor Web',
      },
      content: [
        { types: 'paragraph', content: 'Fala galera 👋' },
        {
          types: 'paragraph',
          content:
            'Estou desenvolvendo este projeto de estudo para fixar os meus conhecimentos e atualizar o meu portfólio.',
        },
        { types: 'link', content: 'ivangomes/rocketblog' },
      ],
      publishedAt: new Date('2022-11-28 20:00:00'),
    },
  ]

  return (
    <div>
      <Header />

      <div className={styles.wrapper}>
        <Sidebar />
        <main>
          {posts.map((post) => {
            return (
              <Post
                key={post.id}
                author={post.author}
                contentPost={post.content}
                publishedAt={post.publishedAt}
              />
            )
          })}
        </main>
      </div>
    </div>
  )
}
