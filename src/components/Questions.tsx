<<<<<<< HEAD
import { ReactNode } from "react"
import cx from 'classnames'

import "../styles/question.scss"

type QuestionProps = {
  content: string;
  author: {
    name: string;
    avatar: string;
  }
  children?: ReactNode;
  isAnswered?: boolean;
  isHighLighted?: boolean;
}

export function Questions({
  content,
  author,
  isAnswered = false,
  isHighLighted = false,
  children,
}: QuestionProps) {
  return (
    <div className={cx(
      'question',
      { answered: isAnswered },
      { highlighted: isHighLighted && !isAnswered },
    )}
    >
      <p>
        {content}
      </p>
      <footer>
        <div className="user-info">
          <img src={author.avatar} alt={author.name} />
          <span>{author.name}</span>
        </div>
        <div>
          {children}
        </div>
      </footer>
    </div>
  )
=======
import { ReactNode } from "react"
import cx from 'classnames'

import "../styles/question.scss"

type QuestionProps = {
  content: string;
  author: {
    name: string;
    avatar: string;
  }
  children?: ReactNode;
  isAnswered?: boolean;
  isHighLighted?: boolean;
}

export function Questions({
  content,
  author,
  isAnswered = false,
  isHighLighted = false,
  children,
}: QuestionProps) {
  return (
    <div className={cx(
      'question',
      { answered: isAnswered },
      { highlighted: isHighLighted && !isAnswered },
    )}
    >
      <p>
        {content}
      </p>
      <footer>
        <div className="user-info">
          <img src={author.avatar} alt={author.name} />
          <span>{author.name}</span>
        </div>
        <div>
          {children}
        </div>
      </footer>
    </div>
  )
>>>>>>> fd27854829265e6cfb3a30b7dc1b059a33a23366
}