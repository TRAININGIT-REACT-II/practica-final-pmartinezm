import './Title.css';

const Title = ({title, children}) => {
    return (
        <>
            <div className="title">{title}</div>
            <div className="children">
                {children}
            </div>
        </>
    )
}

export default Title;