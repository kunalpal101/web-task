import React, { useState } from "react";
import Lazy from "./LazyLoading";

const Folder = ({ name, content, depth }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleFolder = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div style={{ marginLeft: `${depth * 20}px` }}>
      <div>
        <span onClick={toggleFolder} style={{ cursor: "pointer" }}>
          {isOpen ? "🔽" : "▶️"} {name}
        </span>
      </div>
      {isOpen && (
        <div style={{ marginLeft: "20px" }}>
          {Object.entries(content).map(([itemName, itemContent]) => (
            <Node
              key={itemName}
              name={itemName}
              content={itemContent}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const Node = ({ name, content, depth }) => {
  if (
    content &&
    typeof content === "object" &&
    Object.keys(content).length > 0
  ) {
    return <Folder name={name} content={content} depth={depth} />;
  } else {
    return <div style={{ marginLeft: `${depth * 20}px` }}>📄 {name}</div>;
  }
};

const App = () => {
  const data = {
    Documents: {
      "Document1.jpg": null,
      "Document2.jpg": null,
      "Document3.jpg": null,
    },
    Desktop: {
      "Screenshot1.jpg": null,
      "videopal.mp4": null,
    },
    Downloads: {
      Drivers: {
        "Printerdriver.dmg": null,
        "cameradriver.dmg": null,
      },
      Applications: {
        "Webstorm.dmg": null,
        "Pycharm.dmg": null,
        "FileZila.dmg": null,
        "Mattermost.dmg": null,
      },
      "chromedriver.dmg": null,
    },
  };

  return (
    <div>
      <h3>Task 1, Folder Structure</h3>
      {Object.entries(data).map(([name, content]) => (
        <Folder key={name} name={name} content={content} depth={0} />
      ))}
      <br /> <br />
      <h3>Task 2, Lazy Loading</h3>
      <Lazy />
    </div>
  );
};

export default App;
