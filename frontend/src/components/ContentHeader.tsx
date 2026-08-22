type ContentHeaderType = {
    name: string,
    CustomComponent?: React.ReactNode
}

export const ContentHeader = ({name, CustomComponent}:ContentHeaderType) => {
    // const {chat_id} = useParams();
    return (
        <div className="border-b-1 p-1 mb-1 flex justify-between">
            <h1 className="text-xl font-bold pb-2">{name}</h1>
            {CustomComponent}
        </div>
    )
}
