import { PostProps} from './props';

interface Author {
  name: string
  role: string
  avatarUrl: string
}

interface Content {
  types: 'paragraph' | 'link'
  content: string
}

interface PostsObj extends PostProps {
    id: number
}