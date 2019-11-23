<?php
/**
 * Fusion Poll
 * Copyright (c) Simon Raichl 2019
 * MIT License
 */

namespace FusionPoll\API;

require __DIR__ . '/../autoload.php';

use Exception;
use FusionPoll\Model\EmailInformation;
use FusionPoll\Parser\EmailParser;
use Symfony\Component\Yaml\Yaml;

try {
    $parsedYaml = Yaml::parseFile(__DIR__ . '/../config/config.local.yml');
    $emailInfo = new EmailInformation($parsedYaml['emailPollResults']);
    mail(
        $emailInfo->getTo(),
        $emailInfo->getSubject(),
        EmailParser::parseResponseToReadableFormat(),
        $emailInfo->getFrom()
    );
    echo json_encode(['result' => true]);
} catch (Exception $e) {
    echo json_encode(['result' => false]);
}