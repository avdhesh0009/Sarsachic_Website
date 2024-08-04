import "./ProductBar.css";

function ProductBar() {
  return (
    <div class="barroot">
      <div class="barroot-child"></div>
      <div class="navbar" id="navbarContainer">
        <a class="tshirt">TSHIRT</a>
        <a class="bottoms">BOTTOMS</a>
        <a class="caps">CAPS</a>
        <a class="accesories">ACCESORIES</a>
        <a class="oversized">OVERSIZED</a>
      </div>
    </div>
  );
}

export default ProductBar;
