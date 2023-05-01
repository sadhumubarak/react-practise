import { useCallback, useEffect, useState } from "react";
import "./home.scss";

const HomePage = () => {
  const colorGenerator = () => {
    const randomNum = Math.floor(Math.random() * 16777215);
    console.log("random:", randomNum);
    const hexCode = randomNum.toString(16).padStart(6, "0");
    return hexCode;
  };

  const [colorList, setColorList] = useState([
    {
      isLocked: false,
      colorCode: colorGenerator(),
    },
  ]);

  const [copyAlert, setCopyAlert] = useState(false);
  const [selectedText, setSelectedText] = useState("");

  const randomized = useCallback(() => {
    const res = colorList.map((item, index) => {
      if (!item.isLocked) {
        return {
          ...item,
          colorCode: colorGenerator(),
        };
      } else return { ...item };
    });
    setColorList(res);
  }, [colorList]);

  const spaceTrigger = useCallback(
    (event) => {
      event.preventDefault();
      if (event?.keyCode === 32 || event?.target) {
        randomized();
      }
    },
    [randomized]
  );

  console.log(colorList); // outputs something like "#3f6ab8"

  useEffect(() => {
    window.addEventListener("keydown", (e) => spaceTrigger(e));
  }, [spaceTrigger]);

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

  const handleLock = useCallback(
    (idx) => () => {
      const curBool = colorList[idx].isLocked;
      const updatedData = colorList.map((item, index) => {
        if (index === idx) {
          return { ...item, isLocked: !curBool };
        } else return { ...item };
      });
      setColorList(updatedData);
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
    []
  );

  const curYear = new Date().getFullYear;

  return (
    <>
      <header className="header-bar">
        <div className="header-container">
          <div className="box-brand">
            <img
              src="https://user-images.githubusercontent.com/30767528/57573928-1e78db80-7430-11e9-940c-aecbf3226b7c.png"
              alt=""
              className="brand"
            />
            <h3 className="brand-name">
              Paint
              <span>Dappa</span>{" "}
            </h3>
          </div>

          <div className="box-menu"></div>
        </div>
      </header>
      <footer className="footer-bar">
        <div className="footer-container">
          <p className="copyright">
            &copy;{curYear} <span>Paint Dappa</span> Don't steal our stuff,
            please!.
          </p>

          <div className="helper-bar">
            <div className="icon-holder">
              <i class="fa-brands fa-github"></i>
            </div>
          </div>
        </div>
      </footer>

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
              <>
                <div className="palete-cover">
                  <div className="card-frame">
                    <div
                      className="color-box"
                      key={idx}
                      style={{
                        background: `#${item && item?.colorCode}`,
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
                        <i className="fas fa-trash-alt"></i>
                      </button>
                      <div className="utilitybox"></div>
                    </div>
                    <div className="color-code">
                      <i class="fa-solid fa-palette"></i>
                      {item.colorCode}
                    </div>
                  </div>

                  <div className="utility-bar">
                    <button
                      className="btn-tool addList"
                      onClick={copyToClip(item.colorCode)}
                    >
                      <i className="fa-regular fa-copy"></i>
                    </button>
                    <button
                      className="btn-tool addList"
                      onClick={handleLock(idx)}
                    >
                      {item.isLocked ? (
                        <i className="fa-solid fa-lock"></i>
                      ) : (
                        <i className="fa-solid fa-unlock"></i>
                      )}
                    </button>

                    <button
                      className="btn-tool addList"
                      onClick={handleRemove(idx)}
                    >
                      <i className="fa-solid fa-paintbrush"></i>
                    </button>

                    {/* <button
                    className="btn-tool addList"
                    onClick={handleRemove(idx)}
                  >
                    D
                  </button>

                  <button
                    className="btn-tool addList"
                    onClick={handleRemove(idx)}
                  >
                    D
                  </button> */}
                  </div>
                </div>
              </>
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
