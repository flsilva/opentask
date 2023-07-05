export const FacebookLogoSvg = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width="1rem"
    height="1rem"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    {...props}
  >
    <mask
      id="facebook-icon_svg__a"
      maskUnits="userSpaceOnUse"
      x="0"
      y="0"
      width="18"
      height="18"
      style={{ maskType: 'alpha' }}
    >
      <path fillRule="evenodd" clipRule="evenodd" d="M.001 0H18v17.89H.001V0z" fill="#fff"></path>
    </mask>
    <g mask="url(#facebook-icon_svg__a)">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18 9a9 9 0 10-10.406 8.89v-6.288H5.309V9h2.285V7.017c0-2.255 1.343-3.501 3.4-3.501.984 0 2.014.175 2.014.175v2.215h-1.135c-1.118 0-1.467.694-1.467 1.406V9h2.496l-.399 2.602h-2.097v6.289C14.71 17.216 18 13.492 18 9z"
        fill="#1877F2"
      ></path>
    </g>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12.503 11.602l.4-2.602h-2.497V7.312c0-.712.349-1.406 1.467-1.406h1.135V3.691s-1.03-.175-2.015-.175c-2.056 0-3.4 1.246-3.4 3.501V9H5.31v2.602h2.285v6.289a9.067 9.067 0 002.812 0V11.6h2.097z"
      fill="#fff"
    ></path>
  </svg>
);
