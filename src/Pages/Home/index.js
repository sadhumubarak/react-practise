import { useCallback, useEffect, useState } from "react";
import "./home.scss";

const HomePage = () => {
  const [colorList, setColorList] = useState([
    {
      isLocked: false,
      colorCode: "",
    },
  ]);

  const [copyAlert, setCopyAlert] = useState(false);
  const [selectedText, setSelectedText] = useState("");

  const randomized = useCallback(() => {
    const res = colorList.map((item, index) => {
      return {
        ...item,
        colorCode: colorGenerator(),
      };
    });
    setColorList(res);
  }, [colorList]);

  const spaceTrigger = useCallback(
    (event) => {
      randomized();
      if (event?.keyCode === 32) {
        randomized();
      }
    },
    [randomized]
  );

  const colorGenerator = () => {
    const randomNum = Math.floor(Math.random() * 16777215);
    console.log("random:", randomNum);
    const hexCode = randomNum.toString(16).padStart(6, "0");
    return "#" + hexCode;
  };

  console.log(colorList); // outputs something like "#3f6ab8"

  useEffect(() => {
    window.addEventListener("keydown", (e) => spaceTrigger(e));
  }, []);

  const handleAdd = useCallback(() => {
    const dataToAdd = {
      isLocked: false,
      colorCode: colorGenerator(),
    };
    setColorList([...colorList, dataToAdd]);
  }, [colorList]);

  const handleRemove = useCallback(
    (idx) => () => {
      const filter = colorList.filter((item, index) => idx !== index);

      setColorList(filter);
    },
    [colorList]
  );

  const copyToClip = useCallback(
    (text) => () => {
      setCopyAlert(true);
      setSelectedText(text);
      navigator.clipboard.writeText(text);

      setTimeout(() => {
        setCopyAlert(false);
      }, 2000);
    },
    [copyAlert, selectedText]
  );

  return (
    <>
      {copyAlert && (
        <div className="toaster-copy">
          Color {selectedText} copied to your clipboard
        </div>
      )}
      <div
        className="color-container"
        style={{
          // display: "flex",
          height: "100vh",
          width: "100vw",
        }}
      >
        <div className="palete-viewport">
          <div className="palete-holder">
            {colorList.map((item, idx) => (
              <div className="card-frame">
                <div
                  className="color-box"
                  key={idx}
                  style={{
                    background: `${item && item?.colorCode}`,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "end",
                    padding: "20px",
                    position: "relative",
                  }}
                >
                  <button
                    className="btn-action addList"
                    onClick={handleRemove(idx)}
                  >
                    X
                  </button>
                  <div className="utilitybox">
                    <div className="tool">
                      <button
                        className="btn-tool addList"
                        onClick={handleRemove(idx)}
                      >
                        D
                      </button>
                    </div>
                    <div className="tool">
                      <button
                        className="btn-tool addList"
                        onClick={handleRemove(idx)}
                      >
                        D
                      </button>
                    </div>
                    <div className="tool">
                      <button
                        className="btn-tool addList"
                        onClick={handleRemove(idx)}
                      >
                        D
                      </button>
                    </div>
                    <div className="tool">
                      <button
                        className="btn-tool addList"
                        onClick={handleRemove(idx)}
                      >
                        D
                      </button>
                    </div>
                  </div>
                </div>
                <div className="color-code">
                  {item.colorCode}
                  <button className="copy" onClick={copyToClip(item.colorCode)}>
                    C
                  </button>
                </div>
              </div>
            ))}

            <div className="card-frame">
              <div
                className="color-box add-box"
                style={{
                  border: "2px dashed #dfdfdf",
                }}
              >
                <button className="btn-action addList" onClick={handleAdd}>
                  +
                </button>
              </div>
            </div>
          </div>

          <div className="main-tool">
            <button className="gen-pal" onClick={spaceTrigger}>
              Generate Palette
            </button>
            <p>
              Or just press <span>"Spacebar"</span> to generate new palettes.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
