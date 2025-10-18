import style from "./Loader.module.css";

function Loader() {
    return <div className="w-full flex items-center justify-center">
        <div className={style.loader}></div>
    </div>;
}

export default Loader;