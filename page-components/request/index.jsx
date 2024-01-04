import { Loader } from "@/components/loader";
import { TEMPLATES } from "@/services";
import { useMutation } from "@tanstack/react-query";

import React, { useEffect, useState } from "react";
const RequestPurchase = () => {
  const [request, setRequest] = useState([]);
  const requestBuy = useMutation({
    mutationFn: TEMPLATES.addon,
    onSuccess: (data) => {
      setRequest(data.addons);
    }
  });
  useEffect(() => {
    requestBuy.mutate();
  }, []);

  return (
    <>
      {!requestBuy.isLoading ? (
        request && Array.isArray(request) && request.length > 0 ? (
          request.map((item, index) => (
            <div key={`request-${index}`} className="grid grid-cols-3">
              <p>price:{item.price}</p>
              <p>no of request :{item.no_of_request}</p>
              <p>currency :{item.currency}</p>
            </div>
          ))
        ) : (
          "No record found"
        )
      ) : (
        <Loader fullScreen={true} />
      )}
    </>
  );
};

export default RequestPurchase;
