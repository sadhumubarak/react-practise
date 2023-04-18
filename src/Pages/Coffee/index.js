import "./coffee.scss";
import data from "./data.json";

const CoffeePage = () => {
  return (
    <div className="coffee-shop">
      <div className="items-container">
        <div className="section-1">
          <h3 className="section-title">Empty Description</h3>
          {data.noValues.map((item, i) => (
            <div className="itemBox" key={i}>
              <div className="item-content">
                <div className="item-avatar">
                  <img src={item.avatar} alt="coffee" />
                </div>
                <div className="item-detail">
                  <h3 className="item-name">{item.itemName}</h3>
                  <p className="item-desc">{item.description}</p>
                </div>
                <div className="item-cost">
                  <h5 className="item-price">$ {item.price}</h5>
                </div>
                <button className="btn-add">+</button>
              </div>
            </div>
          ))}
        </div>
        <div className="section-1">
          <h3 className="section-title">Without Description Key</h3>
          {data.noDesc.map((item, i) => (
            <div className="itemBox" key={i}>
              <div className="item-content">
                <div className="item-avatar">
                  <img src={item.avatar} alt="coffee" />
                </div>
                <div className="item-detail">
                  <h3 className="item-name">{item.itemName}</h3>
                  <p className="item-desc">{item.description}</p>
                </div>
                <div className="item-cost">
                  <h5 className="item-price">$ {item.price}</h5>
                </div>
                <button className="btn-add">+</button>
              </div>
            </div>
          ))}
        </div>
        <div className="section-1">
          <h3 className="section-title">Free Cost</h3>
          {data.offerValue.map((item, i) => (
            <div className="itemBox" key={i}>
              <div className="item-content">
                <div className="item-avatar">
                  <img src={item.avatar} alt="coffee" />
                </div>
                <div className="item-detail">
                  <div className="item-name">{item.itemName}</div>
                  <p className="item-desc">{item.description}</p>
                </div>
                <div className="item-cost">
                  <h5
                    className={`item-price ${
                      item.salePrice === 0 && "price-strike"
                    }`}
                  >
                    $ {item.price}
                  </h5>
                  {item.salePrice === 0 && (
                    <h5 className="offer-price">FREE</h5>
                  )}
                </div>
                <button className="btn-add">+</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CoffeePage;
