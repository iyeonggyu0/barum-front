// "#f0f8f4"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { crashBoxStyle } from "./CrashBox.stytle";
import { faCircleCheck, faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import CrashBoxSkeleton from "./CrashBoxSkeleton";

const CrashBox = ({ isLoading, data }) => {
  if (isLoading) {
    return <CrashBoxSkeleton />;
  }
  return (
    <section>
      {data.map((item, idx) => (
        <div css={crashBoxStyle(item.level === "GOOD" ? true : false)} key={idx}>
          {item.level === "AVOID" && <FontAwesomeIcon className="icon" icon={faCircleExclamation} />}
          {item.level === "GOOD" && <FontAwesomeIcon className="icon" icon={faCircleCheck} />}
          <div className="text-box">
            <div className="title-box">
              <div>
                <p className="ingredient">
                  {item.ingredients?.map((ingredient, idx) => (
                    <span className="ingredient" key={idx}>
                      {ingredient}
                      <span className="plus">+</span>
                    </span>
                  ))}
                </p>
                <p>{item.label}</p>
              </div>
              {item.source && (
                <a className="reason" href={item.source} target="_blank">
                  이유 보기
                </a>
              )}
            </div>

            <div className="text">{item.reason}</div>

            <p className="guide">근거ㆍ대한피부과학회 성분 가이드</p>
          </div>
        </div>
      ))}
    </section>
  );
};
export default CrashBox;
