import { Link } from 'react-router-dom'

const Footer = () => {

  return (
    <footer id="sticky-footer" className="flex-shrink-0 ">
      <div className=" container text-center">
        <Link to="/about" className="">About Me</Link>
        <a target='_blank' rel="noreferrer" href='https://www.fast.com'>Test Your Internet!</a>
      </div>
    </footer>
    // </div>
  )
}

export default Footer