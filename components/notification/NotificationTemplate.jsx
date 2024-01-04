import { IconClose, IconError, IconSuccess } from "@/components/icon";
import { Message } from "@/components/notification/Message";
import React from "react";
import { toast } from "react-hot-toast";

export const NotificationTemplate = ({ t, options }) => {
  const { message, type } = options;
  return (
    <div
      className={`${
        t.visible ? "animate-slide-in" : "animate-leave"
      } max-w-sm w-full dark:bg-primary bg-gray-50 shadow-lg rounded-lg pointer-events-auto flex dark:text-white text-black`}
    >
      <div className="flex-1 w-0 p-3">
        <div className="flex items-center">
          <div className="">
            {type == "success" ? (
              <IconSuccess className="text-green-50 w-5 h-5" />
            ) : (
              <IconError className="text-red-500 w-5 h-5" />
            )}
          </div>
          <div className="ml-3">
            <div className="font-500 text-14 leading-5 text-center">
              <Message message={message}></Message>
            </div>
          </div>
        </div>
      </div>
      <div className="flex border-l border-gray-200">
        <button
          onClick={() => toast.dismiss(t.id)}
          className="w-full flex justify-center p-3 min-w-[64px] items-center"
        >
          <IconClose className="dark:text-white text-black w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
