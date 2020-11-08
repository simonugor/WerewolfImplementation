function Story(props) {
    return(
        <div data-testid="story" className="story_div">
            <p className="story_text">{props.storyText}</p>
            <p className="secondary_text">{props.secondaryText}</p>
        </div>
    )
}

export default Story