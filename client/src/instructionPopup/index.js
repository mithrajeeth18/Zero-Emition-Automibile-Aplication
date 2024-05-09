import styles from "./editablePopup.module.css";

const InstructionPopUp = ({
  showInstructtionPopup,
  setShhowInstructionPopup,
}) => {
  const contianerClassName = `${styles["container"]} ${
    styles[showInstructtionPopup ? "show" : "hide"]
  }`;
  const terms = {
    "Acceptance of Terms": {
      title: "Acceptance of Terms",
      content: [
        "By accessing and using this website, you agree to be bound by these terms and conditions, as well as our privacy policy. If you do not agree with any of these terms, please refrain from using the website.",
      ],
    },
    "Intellectual Property": {
      title: "Intellectual Property",
      content: [
        "All content, trademarks, logos, and intellectual property displayed on this website are the property of [Your Company Name] and are protected by applicable laws. You may not reproduce, modify, distribute, or use any of the content without our prior written consent.",
      ],
    },
    "User Obligations": {
      title: "User Obligations",
      content: [
        "a. You are responsible for providing accurate and up-to-date information when using this website.",
        "b. You agree not to engage in any illegal, unauthorized, or prohibited activities that may disrupt the website's functioning or compromise its security.",
        "c. You shall comply with all applicable laws, regulations, and third-party rights when using the website.",
      ],
    },
    "Privacy Policy": {
      title: "Privacy Policy",
      content: [
        "By using this website, you acknowledge and agree to our privacy policy, which outlines how we collect, use, store, and protect your personal information. Please refer to our privacy policy for more details.",
      ],
    },
    "User-Generated Content": {
      title: "User-Generated Content",
      content: [
        "a. By submitting any content to this website (e.g., comments, reviews, or testimonials), you grant us a non-exclusive, royalty-free, perpetual, and worldwide license to use, modify, reproduce, and distribute the content.",
        "b. You shall not submit any content that is illegal, offensive, defamatory, or infringes on the rights of others.",
      ],
    },
    "Limitation of Liability": {
      title: "Limitation of Liability",
      content: [
        "a. We strive to provide accurate and up-to-date information on this website. However, we do not guarantee the completeness, accuracy, or reliability of the content.",
        "b. We shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising from the use or inability to use this website.",
      ],
    },
    Termination: {
      title: "Termination",
      content: [
        "We reserve the right to suspend or terminate your access to the website at any time and for any reason without prior notice.",
      ],
    },
    Amendments: {
      title: "Amendments",
      content: [
        "We may modify or update these terms and conditions from time to time. Any changes will be effective immediately upon posting on the website. By continuing to use the website, you accept the modified terms and conditions.",
      ],
    },
    "Governing Law": {
      title: "Governing Law",
      content: [
        "These terms and conditions shall be governed by and construed in accordance with the laws of [Your Jurisdiction]. Any disputes arising out of or related to these terms shall be subject to the exclusive jurisdiction of the courts in [Your Jurisdiction].",
      ],
    },
  };

  return (
    <>
      <div className={contianerClassName} />
      <div
        className={styles["dialogContainer"]}
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        style={{ maxWidth: "50%", maxHeight: "80%" }}
      >
        <div
          style={{
            background: "var( --darkBlue-color)",
            height: "50px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            color: "#fff",
            fontWeight: 700,
            fontSize: "18px",
            padding: "4px 6px",
            width: "-webkit-fill-available",
          }}
        >
          <div> Terms of Service & Privacy Policy</div>
          <div
            class={`envelope ${styles["crossIcon"]}`}
            onClick={() => {
              setShhowInstructionPopup(false);
            }}
          ></div>
        </div>
        <div style={{ overflowY: "scroll" }} className="containerPopup">
          {Object.keys(terms).map((key) => (
            <div key={key}>
              <h3>{terms[key].title}</h3>
              <ol>
                {terms[key].content.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default InstructionPopUp;
