import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react';
import { format, formatDistanceToNow } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

import { PostProps } from '../types/props';

import { Avatar } from './Avatar'
import { Comment } from './Comment'

import styles from './Post.module.css'


export function Post({ author, contentPost, publishedAt }: PostProps) {
  const [comments, setComments] = useState(['post muito bacana, hein?!'])
  const [newCommentText, setNewCommentText] = useState('')

  const publishedDateFormatted = format(
    publishedAt,
    "d 'de' LLLL 'às' HH:mm'h'",
    {
      locale: ptBR,
    },
  )

  const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
    locale: ptBR,
    addSuffix: true,
  })

  /* Memorando...
    Todas as funções que vem através de eventos (onClick, onChange...)
    o HTML passa para essas funções, como primeiro parâmetro, o evento (event...)
  */

  // Função executada pelo próprio formulário durante
  // a submissão do formulário...
  function handleCrateNewComment(event: FormEvent) {
    event.preventDefault()

    setComments([...comments, newCommentText])
    setNewCommentText('')
  }

  // handle invocado quando o form/comentário é modificado...
  // Neste caso... levando em consideração que o texto a ser digitado não pode ser de espaços em branco

  // Função disparada através do input text e não, pelo formulário...
  // Então sem a generics<> ("parametros do TS") no ChangeEvent,
  // ele não reconhece a propriedade setCustomValidity que existe
  // dentro do input, e não, do evento.
  function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity('')
    setNewCommentText(event.target.value)
  }

  // handle invocado pelo input, quando o form/comentário está vazio...
  function handleNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity('Esse campo é obrigatório!')
  }

  /* Aplicando o conceito de imutabilidade, o filter é usado para procurar e deixar de fora
  o comentário "marcado" para ser excluído e atualizar o estado de comentários com a nova lista
  sem aquele comentário indesejado */
  function deleteComment(commentToDelete: string) {
    const commentsWithoutDeletedOne = comments.filter((comment) => {
      return comment !== commentToDelete
    })

    setComments(commentsWithoutDeletedOne)
  }

  // Validações
  const isNewCommentEmpty = newCommentText.trim().length === 0

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar src={author.avatarUrl} />
          <div className={styles.authorInfo}>
            <strong>{author.name}</strong>
            <span>{author.role}</span>
          </div>
        </div>

        <time
          title={publishedDateFormatted}
          dateTime={publishedAt.toISOString()}
        >
          {publishedDateRelativeToNow}
        </time>
      </header>

      <div className={styles.content}>
        {contentPost.map((line) => {
          if (line.types === 'paragraph') {
            return <p key={line.content}>{line.content}</p>
          } else if (line.types === 'link') {
            return (
              <p key={line.content}>
                <a href="#">{line.content}</a>
              </p>
            )
          }
        })}
      </div>

      <form onSubmit={handleCrateNewComment} className={styles.commentForm}>
        <strong>Deixe seu feedback</strong>

        <textarea
          name="comment"
          placeholder="Deixe um comentário"
          value={newCommentText}
          onChange={handleNewCommentChange}
          onInvalid={handleNewCommentInvalid}
          required
        />

        <footer>
          <button type="submit" disabled={isNewCommentEmpty}>
            Publicar
          </button>
        </footer>
      </form>

      <div className={styles.commentList}>
        {comments.map((comment) => {
          return (
            <Comment
              key={comment}
              content={comment}
              onDeleteComment={deleteComment}
            />
          )
        })}
      </div>
    </article>
  )
}
