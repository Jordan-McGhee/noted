import Card from "../../../Components/UI/Card"
import "./PostItem.css"

const PostItem = props => {
    return (
        <Card className = "post-card">

            <div>

                <div className="name-date-section">
                    <h3>{ props.user.name }</h3>
                    <h6>{ props.date }</h6>
                </div>

                <div className="content">
                    <p>
                        { props.content }
                    </p>
                </div>

            </div>
        </Card>
    )
}

export default PostItem