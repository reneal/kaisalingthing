jQuery(document).ready(function () {
    var container = jQuery('#events');

    function formatDateToEstonian(dateStr) {
        var date = new Date(dateStr);
        var months = ['jaanuar', 'veebruar', 'märts', 'aprill', 'mai', 'juuni', 'juuli', 'august', 'september', 'oktoober', 'november', 'detsember'];
        var day = date.getDate();
        var month = months[date.getMonth()];
        var year = date.getFullYear();
        var currentYear = new Date().getFullYear();

        return day + '. ' + month + (currentYear !== year ? ' ' + year : '');
    }

    jQuery.getJSON('https://fienta.com/o/840?format=json', function (data) {
        if (data.events.length) {
            data.events.forEach(function (event) {
                var googleMapsLink = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(event.address);
                
                var imageHtml = '';
                if (event.image_url) {
                    imageHtml = '<img src="' + event.image_url + '" alt="' + event.title + '" class="event-image" />';
                }
                
                container.append(
                    '<div class="event-card">' +
                    imageHtml +
                    '<div class="event-date"><i class="fa fa-calendar-alt"></i> ' + formatDateToEstonian(event.starts_at) + '</div>' +
                    '<div class="event-title"><a href="' + event.buy_tickets_url + '">' + event.title + '</a></div>' +
                    '<div class="event-venue"><i class="fa fa-map-marker-alt"></i> <a href="' + googleMapsLink + '" target="_blank" title="' + event.address + '">' + event.venue + '</a></div>' +
                    '</div>'
                );
            });
        } else {
            container.append(
                '<div class="event-card">' +
                '<div class="event-date"></div>' +
                '<div class="event-title">Praegu esinemisi kirjas pole, aga plaanis on kindlasti kontserte anda. Ärge muretsege!</div>' +
                '<div class="event-venue"></div>' +
                '</div>'
            );
        }
    });
});
