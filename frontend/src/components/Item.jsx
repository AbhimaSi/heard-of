function Item(props){
    const { name, yID, key } = props

    const srcUrl = `https://youtube.com/embed/${yID}`

    return (
        <li className="song-layout" id={key}>
                <iframe src={srcUrl} width={480} height={270}/>
                <div className="">
                    <span>
                        {name}
                    </span>
                </div>
        </li>
    )
}

export default Item