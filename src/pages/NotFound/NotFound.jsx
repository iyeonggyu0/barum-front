import { Link, useNavigate } from "react-router-dom";
import { actionsCss, cardCss, codeCss, descCss, dividerCss, ghostBtnCss, hintCss, notFoundCss, primaryBtnCss, titleCss } from "./NotFound.styles";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <main css={notFoundCss}>
      <section css={cardCss} aria-labelledby="notfound-title">
        <div css={codeCss}>404</div>
        <h1 css={titleCss} id="notfound-title">
          페이지를 찾을 수 없어요
        </h1>
        <p css={descCss}>주소가 변경되었거나 존재하지 않는 페이지입니다. 홈으로 돌아가주세요.</p>
        <div css={dividerCss} />
        <div css={actionsCss}>
          <Link to="/" css={primaryBtnCss}>
            홈으로 가기
          </Link>
          <button type="button" css={ghostBtnCss} onClick={() => navigate(-1)}>
            이전 페이지
          </button>
        </div>
        <div css={hintCss}>
          <span className="dot" aria-hidden="true" />
          메인 페이지에서 계속 탐색할 수 있어요.
        </div>
      </section>
    </main>
  );
};

export default NotFound;
