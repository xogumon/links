export default function link({ link }) {
    const icon = `${link.tags.join(" ")} fs-4 position-absolute start-0 ms-4`
    return (
        <a href={link.shortURL} target="_blank" className="link text-dark text-decoration-none d-flex justify-content-center align-items-center position-relative p-3 mb-4">
            <i className={icon}></i>
            <span className="fs-3">{link.title}</span>
        </a>
    )
}