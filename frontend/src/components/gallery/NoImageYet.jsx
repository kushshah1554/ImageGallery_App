import { Upload } from "lucide-react";

const NoImageYet = ({saved,notIntrested,myImage}) => {
  return (
    <div className="flex flex-col items-center justify ">
      <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
        <Upload className="w-8 h-8 text-slate-500" />
      </div>
      <p className="text-slate-300 text-lg mb-2">No {saved && saved} {notIntrested && notIntrested} Images Yet</p>
      <p className="text-slate-400 text-sm">
      {myImage &&  "Click the upload button to get started" }
      </p>
    </div>
  );
};

export default NoImageYet;
