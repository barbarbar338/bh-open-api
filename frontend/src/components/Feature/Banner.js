export default function Banner({ title }) {
    return (
        <section className="text-center mg-auto pd-1-5">
            <h1>Feature:</h1>
            <p className="lead">{title}</p>
        </section>
    );
}
