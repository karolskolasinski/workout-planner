import { useState } from "react";
import _ from "lodash";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  onFileSelect: (value: ((prevState: File | null) => File | null) | File | null) => void;
}

const FileInput = (props: InputProps) => {
  const { onFileSelect } = props;
  const cleanProps = _.omit(props, ["onFileSelect"]);
  const [file, setFile] = useState<File | null>(null);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer?.files[0] ?? null;
    handleFile(droppedFile);
  };

  function handleFile(droppedFile: File | null) {
    if (droppedFile && droppedFile.type.startsWith("image/")) {
      setFile(droppedFile);
      onFileSelect(droppedFile);
    } else {
      alert("Only image files are accepted.");
    }
  }

  const dropAreaClass =
    `w-full h-24 border border-[#CBB6E5] rounded-lg bg-white flex justify-center items-center`;

  return (
    <div className="flex flex-col gap-2 leading-none">
      {props.label}

      {dropAreaContent()}

      <input
        {...cleanProps}
        accept="image/*"
        multiple={false}
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.item(0) ?? null)}
      />
    </div>
  );

  function dropAreaContent() {
    if (file) {
      return (
        <div className={dropAreaClass}>
          <span className="text-[#000853] pr-2">{file.name}</span>
          <svg
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            className="min-w-4 h-4 cursor-pointer fill-[#000853] hover:fill-[#ED4545]"
            onClick={() => setFile(null)}
          >
            <path d="M10 0C15.523 0 20 4.477 20 10C20 15.523 15.523 20 10 20C4.477 20 0 15.523 0 10C0 4.477 4.477 0 10 0ZM7.879 6.464C7.69946 6.28275 7.45743 6.17697 7.20245 6.16832C6.94748 6.15967 6.69883 6.2488 6.50742 6.41747C6.31601 6.58613 6.1963 6.82159 6.1728 7.07562C6.14929 7.32966 6.22378 7.58308 6.381 7.784L6.465 7.879L8.585 9.999L6.465 12.121C6.28375 12.3005 6.17797 12.5426 6.16932 12.7975C6.16067 13.0525 6.2498 13.3012 6.41847 13.4926C6.58713 13.684 6.82258 13.8037 7.07662 13.8272C7.33066 13.8507 7.58408 13.7762 7.785 13.619L7.879 13.536L10 11.414L12.121 13.536C12.3005 13.7173 12.5426 13.823 12.7975 13.8317C13.0525 13.8403 13.3012 13.7512 13.4926 13.5825C13.684 13.4139 13.8037 13.1784 13.8272 12.9244C13.8507 12.6703 13.7762 12.4169 13.619 12.216L13.536 12.121L11.414 10L13.536 7.879C13.7173 7.69946 13.823 7.45743 13.8317 7.20245C13.8403 6.94748 13.7512 6.69883 13.5825 6.50742C13.4139 6.31601 13.1784 6.1963 12.9244 6.1728C12.6703 6.14929 12.4169 6.22378 12.216 6.381L12.121 6.464L10 8.586L7.879 6.464Z" />
          </svg>
        </div>
      );
    }

    return (
      <div
        className={dropAreaClass}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        <label htmlFor={props.id} className="cursor-pointer text-[#761BE4] underline pr-1">
          Upload a file
        </label>
        <span className="text-[#898DA9]">or drag and drop here</span>
      </div>
    );
  }
};

export default FileInput;
