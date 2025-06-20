import {EmptyComponent} from "../EmptyComponent";

export const List = ({ items, empty: { title, hint }, children }) => {
  return (
    <div className="list">
      {items.length === 0 ? (
        <EmptyComponent title={title} hint={hint} />
      ) : (
        items.map((item, index) => (
          <div key={index} className="list__item">
            {children(item, index)}
          </div>
        ))
      )}
    </div>
  );
};