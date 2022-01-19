const Tag = (name) => {
    return (
        <div>
        <span
          className=
          {classnames(
          `px-2 inline-flex text-xs leading-5 font-semibold rounded-md ${PROVIDER_TYPE_CLASSES[name.type]}` ,
          props.className,
          {name?.type}
        </span>
        </div>
    )
}

export default Tag
