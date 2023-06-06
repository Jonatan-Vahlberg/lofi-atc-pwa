

const IconButton = ({
    Icon = null,
    buttonProps = {},
    iconProps = {
        size: 24,
        color: "#ff4f8a"

    },
}) => {
    return (
        <button
            {...buttonProps}
            className={`${buttonProps?.className || ""} icon-button`}
        >
            { Icon && <Icon
                {...iconProps}
            />}
        </button>
    )
}

export default IconButton;