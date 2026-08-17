import { LeftButton } from "@/components";
import { BasicLayout } from "@/layouts";
import { layoutStyle, makeupSelectStyle } from "./MakeupSelect.style";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faCamera } from "@fortawesome/free-regular-svg-icons";

const MakeupSelect = () => {
  const nav = useNavigate();
  return (
    <BasicLayout styleObj={layoutStyle}>
      <header>
        <span onClick={() => nav(-1)}>
          <LeftButton />
        </span>
        제품 추가
      </header>
      <section css={makeupSelectStyle}>
        <p className="title">어떻게 등록할까요</p>
        <div onClick={() => nav("/makeup/create/search")} className="box green">
          <div className="suggestion">
            <span>추천</span>
            <FontAwesomeIcon icon={faAngleRight} className="right" />
          </div>
          <div className="title-box">
            <div className="icon-box">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </div>
            <p className="icon-title">제품 검색으로 등록</p>
          </div>
          <p className="caption">
            올리브영 인기 제품 DB에서 골라 담아요.
            <br />
            성분이 이미 정리돼 있어 바로 등록됩니다.
          </p>
        </div>
        <div onClick={() => nav("/makeup/create/camera")} className="box white">
          <div className="title-box">
            <div className="icon-box">
              <FontAwesomeIcon icon={faCamera} className="right" />
            </div>
            <p className="icon-title">전성분표 사진으로 등록</p>
          </div>
          <p className="caption">
            직구·소분·신제품처럼 DB에 없는 제품은
            <br />
            뒷면 성분표를 찍어 등록해요.
          </p>
        </div>
      </section>
    </BasicLayout>
  );
};
export default MakeupSelect;
