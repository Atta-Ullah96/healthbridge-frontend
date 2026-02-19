import { RxCross2 } from "react-icons/rx";
import { FaAnchor } from "react-icons/fa6";

import { Icon } from "../../../components/atoms/icon";
import Text from "../../../components/atoms/text";

import { createPortal } from "react-dom";
const doctorCategories = [
  { title: 'Dermatologist', Icon:FaAnchor },
  { title: 'Dermatologist', Icon:FaAnchor },
  { title: 'Dermatologist', Icon:FaAnchor },
  { title: 'Gynecologist', Icon:FaAnchor },
  { title: 'Gynecologist', Icon:FaAnchor },
  { title: 'Gynecologist', Icon:FaAnchor },
  { title: 'Gynecologist', Icon:FaAnchor },
  { title: 'Gynecologist', Icon:FaAnchor },
  { title: 'Gynecologist', Icon:FaAnchor },
  { title: 'Gynecologist', Icon:FaAnchor },
  { title: 'Gynecologist', Icon:FaAnchor },
  { title: 'Gynecologist', Icon:FaAnchor },

]


export const DoctorCategoryModal = (props) => {
  const { isOpen, onClose } = props || {};
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50  bg-opacity-30 flex items-center justify-center">
      <div className="bg-card-bg p-6 rounded-lg w-[90%] max-w-4xl">
        <div className="flex justify-between items-center mb-4">
          <Text variant={"heading1"} className="text-xl font-semibold text-dark">Choose a Doctor Category</Text>
          <button onClick={onClose}>
            <Icon  icon={RxCross2}   className="text-dark cursor-pointer"/>
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {doctorCategories.map((item) => <CategoryChild item={item} key={item.key} /> )}
        </div>
      </div>
    </div>
  , document.body);
};


function CategoryChild(props){
  const {item} = props || {};

  return (
            <div
              key={item.title}
              className="flex flex-col items-center text-center p-2 rounded hover:bg-background cursor-pointer transition"
            >
              <item.Icon />
              <span className="mt-2 text-sm text-dark">{item.title}</span>
            </div>
  )
  
}
