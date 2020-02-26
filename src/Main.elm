module Main exposing (..)

import Browser
import Html exposing (Html, button, div)
import Html.Events exposing (onClick)
import Svg exposing (..)
import Svg.Attributes exposing (..)

main =
  Browser.sandbox { init = 0, update = update, view = view }

type Msg = Increment | Decrement

update msg model =
  case msg of
    Increment ->
      model + 1

    Decrement ->
      model - 1

view model =    
  div []
    [ button [ onClick Decrement ] [ text "-" ]
    , div [] [ text (String.fromInt model) ]
    , svg
      [ width "120", height "120", viewBox "0 0 120 120" ]
      [ rect [ x (String.fromInt model), y (String.fromInt model), width "100", height "100", rx "15", ry "15", opacity (String.fromFloat (1.01/(toFloat model + 1.0))) ] [] ]
    , button [ onClick Increment ] [ text "+" ]
    ]
