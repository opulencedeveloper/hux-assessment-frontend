import { useRouter } from "next/navigation";

import { CardProps } from "../../../shared/types"

const Card: React.FC<CardProps> = (props) => {
    const router = useRouter()

    const {
        title,
        subTitle,
        description,
        _id,
        handleCardClick,
        deleteContactIsLoading,
        handleDeleteBtnClick } = props;

    const handleViewDetailsBtn = () => {
        if (handleCardClick) {
            handleCardClick(_id);
        }
    }

    const handleEditButton = () => {
        router.push(`/contact/edit/${_id}`)
    }

    const handlDeleteButton = () => {
        if (handleDeleteBtnClick) {
            if (confirm("Are you sure you want to delete this contact?")) {
                handleDeleteBtnClick(_id)
            }
        }
    }

    return <div className="relative group">
        <div
            className="absolute transition rounded-lg opacity-25 -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 blur duration-400 group-hover:opacity-100 group-hover:duration-200">
        </div>
        <div
            className="relative p-6 space-y-6 leading-none rounded-lg bg-slate-800 ring-1 ring-gray-900/5">
            <div className="flex items-center justify-between space-x-4">
                <div className="flex items-center justify-between space-x-4">
                    <img
                        src="https://pbs.twimg.com/profile_images/1276461929934942210/cqNhNk6v_400x400.jpg"
                        className="w-12 h-12 bg-center bg-cover border rounded-full" alt="Image" />
                    <div>
                        <h3 className="text-lg font-semibold text-white">{`${title} ${subTitle}`}</h3>

                    </div>
                </div>
                <button onClick={handleEditButton}>Edit</button>

            </div>
            {description && <p className="leading-normal text-gray-300 text-md">{description}</p>}
            {description && <button onClick={handlDeleteButton}>{deleteContactIsLoading ? "Please wait.." : "Delete"}</button>}
            {!description && <button className="text-sm" onClick={handleViewDetailsBtn}>View Details</button>}
        </div>

    </div>
}

export default Card;





