import './style.css';

const Loader = ({label}) => {
    return (
        <div>
            <center>
                <div className="majour-loader"></div>
                <h3 className="gray font-weight-bold mt-5">{label}</h3>
            </center>
        </div>
    )
}
export default Loader