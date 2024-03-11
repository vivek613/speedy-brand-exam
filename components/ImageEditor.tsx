import React, { useState, useRef } from "react";
import { toPng } from "html-to-image";
import { useTheme } from "next-themes";
import ThemeSwitch from "./ThemeSwitch";

interface ImageEditorProps {}

interface ImageEditorState {
  image: string | null;
  text: string;
  fontSize: number;
  fontColor: string;
  positionX: number;
  positionY: number;
}

const ImageEditor: React.FC<ImageEditorProps> = () => {
  const elementRef = useRef<any>(null);
  const [state, setState] = useState<ImageEditorState>({
    image: null,
    text: "",
    fontSize: 30,
    fontColor: "red",
    positionX: 50,
    positionY: 1,
  });
  const canvasRef = useRef<HTMLCanvasElement>(null);

  //  change all input function
  const handleInputChange =
    (key: keyof ImageEditorState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setState((prevState) => ({
        ...prevState,
        [key]: e.target.value,
      }));
    };
  // image upload funtion
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setState((prevState) => ({
          ...prevState,
          image: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };
  // download image function
  const handleSave = () => {
    toPng(elementRef.current, { cacheBust: false })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "image.png";
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className=" absolute right-4 top-3 border-2 p-3 rounded-sm">
        <ThemeSwitch />
      </div>
      <div
        className={`flex flex-col items-center justify-center p-[50px] space-y-4 `}
      >
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="py-2 px-4 bg-gray-200 rounded-lg"
        />
        {state.image && (
          <div className="relative overflow-hidden" ref={elementRef}>
            <img
              src={state.image}
              alt="Uploaded"
              className="w-[100%]  h-[350px] "
            />
            <span
              className={`absolute`}
              style={{
                left: `${state.positionX}%`,
                top: `${state.positionY}%`,
                fontSize: `${state.fontSize}px`,
                color: `${state.fontColor}`,
                transform: "translateX(-50%)",
              }}
            >
              {state.text}
            </span>
          </div>
        )}
        <div className="flex flex-col w-full ">
          Text:
          <textarea
            value={state.text}
            disabled={!state.image}
            onChange={handleInputChange("text")}
            className=" p-2 border border-gray-300 rounded-md"
          ></textarea>
        </div>

        <div className="flex gap-[20px] w-[100%]">
          <label className="flex flex-col w-[20%]">
            Font Size:
            <input
              type="number"
              value={state.fontSize}
              disabled={!state.image}
              min={5}
              max={30}
              onChange={handleInputChange("fontSize")}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </label>

          <label className="flex flex-col w-[20%]">
            Font Color:
            <input
              type="color"
              value={state.fontColor}
              disabled={!state.image}
              onChange={handleInputChange("fontColor")}
              className="w-full p-2 border border-gray-300 rounded-md h-[43px]"
            />
          </label>

          <label className="flex flex-col w-[20%]">
            X Position:
            <input
              type="number"
              value={state.positionX}
              disabled={!state.image}
              min={1}
              max={100}
              onChange={handleInputChange("positionX")}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </label>

          <label className="flex flex-col w-[20%]">
            Y Position:
            <input
              type="number"
              value={state.positionY}
              disabled={!state.image}
              min={1}
              max={100}
              onChange={handleInputChange("positionY")}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </label>
        </div>

        <button
          onClick={handleSave}
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Save
        </button>

        {/* Canvas to draw the edited image */}
        <canvas ref={canvasRef} style={{ display: "none" }} />
      </div>
    </>
  );
};

export default ImageEditor;
