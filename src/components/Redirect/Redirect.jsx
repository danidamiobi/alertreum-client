import { Link } from 'react-router-dom';
const Redirect = ({alternative, link}) => {
    return (
        <div>
            <span>{alternative}</span> <Link to={link.link}>{link.text}</Link>
        </div>
    )
};

export default Redirect;