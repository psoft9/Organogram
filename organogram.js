var prOrganogram = {
    prWrap: {
      prBoxWrap: "<div class='pr-box'>Main</div>",
      children: [
        {
          prWrap: {
            prBoxWrap: "<div class='pr-box'>Child 1</div>",
            children: [
              {
                prWrap: {
                  prBoxWrap: "<div class='pr-box'>GC 1</div>",
                  children: []
                }
              },
              {
                prWrap: {
                  prBoxWrap: "<div class='pr-box'>GC 2</div>",
                  children: []
                }
              }
            ]
          }
        },
        {
          prWrap: {
            prBoxWrap: "<div class='pr-box'>Child 2</div>",
            children: [
              {
                prWrap: {
                  prBoxWrap: "<div class='pr-box'>GC 3</div>",
                  children: []
                }
              },
              {
                prWrap: {
                  prBoxWrap: "<div class='pr-box'>GC 40</div>",
                  children: []
                }
              }
            ]
          }
        },
        {
          prWrap: {
            prBoxWrap: "<div class='pr-box'>Child 3</div>",
            children: [
              {
                prWrap: {
                  prBoxWrap: "<div class='pr-box'>GC 3</div>",
                  children: [
                    {
                      prWrap: {
                        prBoxWrap: "<div class='pr-box'>Debi</div>",
                        children: []
                      }
                    }
                  ]
                }
              },
              {
                prWrap: {
                  prBoxWrap: "<div class='pr-box'>GC 40</div>",
                  children: []
                }
              }
            ]
          }
        }
      ]
    }
  };
  