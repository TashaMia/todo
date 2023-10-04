import {
  ChangeEvent,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import { supabase } from "../supabase";
import { useDispatch, useSelector } from "react-redux";
import { WRITE_TASK_IMG_ARRAY } from "../redux/reducers/tasksReducer";

export default function FileAdder() {
  const filePicker = useRef<HTMLInputElement>(null);

  function handlePick() {
    filePicker?.current?.click();
  }

  const [picture, setPicture] = useState<File | null>(null);
  const id = useId();
  const select = useSelector((state: any) => state.tasks.tasks.length);
  const bucket = "tasksImg";
  const [pictureList, setPictureList] = useState<string[]>([]);

  const [imageLoader, setImageLoader] = useState<string>("download");
  const [attantion, setAttantion] = useState(false);
  async function handleChangeFiles(event: ChangeEvent<HTMLInputElement>) {
    const files = event.currentTarget.files as FileList;
    if (!files) return;
    const file = files[0];
    if (pictureList.length > 3) {
      setAttantion(true);
      return;
    }
    setPicture(file && file);
    const filePath = `${bucket}/${select}-${window.crypto.randomUUID()}.jpg`;
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(filePath, file);

    if (error) {
      throw error;
    } else {
      setImageLoader("loaded");
      setPictureList((prev) =>
        prev.concat(
          `https://vohakndhicppbrmoajtw.supabase.co/storage/v1/object/public/tasksImg/${filePath}`
        )
      );
    }
  }
  useEffect(() => {
    if (picture !== null) {
      setImageLoader("loading");
    }
  }, [picture]);

  useEffect(() => {
    dispatch({ type: WRITE_TASK_IMG_ARRAY, payload: pictureList });
  }, [pictureList]);
  const dispatch = useDispatch();

  return (
    <div className="add-file-section">
      <button
        onClick={() => {
          handlePick();
        }}
      >
        <input
          ref={filePicker}
          type="file"
          onChange={(e) => {
            handleChangeFiles(e);
          }}
          accept="image/*,.png,.jpg,.gif"
        />
        <p>Add file</p>
        <img
          src="./svg/file-plus.svg"
          alt="add file"
          width={18}
          height={18}
        ></img>
      </button>
      <div className="picture-list">
        {attantion && (
          <div className="attantion">
            <p>⚠️ You can only add 4 files</p>
          </div>
        )}
        {pictureList.length > 0 ? (
          //   pictureList.map((link) => {
          <div className="picture-section">
            <img
              src={pictureList?.[0]}
              width={80}
              height={80}
              alt="post picture"
            ></img>
            {pictureList.length > 1 ? (
              <div className="other-files">
                <p>+{pictureList?.length - 1}</p>
              </div>
            ) : (
              <></>
            )}
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
